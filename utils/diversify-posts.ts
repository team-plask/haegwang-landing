// 업무사례 정렬: 한 화면에 최대한 많은 변호사가 보이도록 배치합니다.
// 1단계) 모든 변호사가 한 건씩 돌아가며 나옵니다(라운드마다 순서 무작위).
//        사례가 적은 변호사들의 사례가 모두 나올 때까지 계속합니다.
// 2단계) 사례가 많은 변호사 2명만 남으면, 남은 사례를 목록 끝까지 고르게 섞어 배치합니다.
//        (한 변호사 사례가 끝에 몰려 연달아 나오지 않도록)

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 남은 사례를 변호사별로 0~1 구간의 n칸에 하나씩 놓고(칸 안 위치는 무작위) 위치 순으로 정렬
function spreadEvenly<T>(queues: { key: string; items: T[] }[]): { key: string; item: T }[] {
  const placed: { key: string; item: T; pos: number }[] = [];
  for (const q of queues) {
    const n = q.items.length;
    q.items.forEach((item, i) => {
      // 칸 가운데 근처(±0.3칸)에 놓아 한쪽으로 쏠리지 않게
      placed.push({ key: q.key, item, pos: (i + 0.5 + (Math.random() - 0.5) * 0.6) / n });
    });
  }
  placed.sort((a, b) => a.pos - b.pos);
  return placed;
}

export function diversifyByAuthor<T>(items: T[], getAuthorKey: (item: T) => string): T[] {
  const groups = new Map<string, T[]>();
  for (const item of shuffle(items)) {
    const key = getAuthorKey(item);
    const group = groups.get(key);
    if (group) group.push(item);
    else groups.set(key, [item]);
  }

  let queues = [...groups.entries()].map(([key, list]) => ({ key, items: list }));
  const result: { key: string; item: T }[] = [];

  // 1단계: 3명 이상 남아 있는 동안 한 건씩 돌아가며
  while (queues.length > 2) {
    let round = shuffle(queues);
    // 라운드 경계에서 같은 변호사가 연달아 나오지 않도록
    const lastKey = result[result.length - 1]?.key;
    if (round[0].key === lastKey) {
      round = [...round.slice(1), round[0]];
    }
    for (const q of round) {
      result.push({ key: q.key, item: q.items.shift()! });
    }
    queues = queues.filter((q) => q.items.length > 0);
  }

  // 2단계 전에, 아직 한 번도 안 나온 변호사가 있으면 먼저 한 건씩 보여줌
  // (변호사가 처음부터 2명뿐인 탭에서도 두 사람이 첫 화면에 모두 보이도록)
  if (result.length === 0 && queues.length === 2) {
    for (const q of shuffle(queues)) {
      result.push({ key: q.key, item: q.items.shift()! });
    }
    queues = queues.filter((q) => q.items.length > 0);
  }

  // 2단계: 남은 1~2명은 끝까지 고르게 섞기
  const rest = spreadEvenly(queues);
  if (rest.length > 1 && rest[0].key === result[result.length - 1]?.key) {
    // 이어지는 첫 칸이 직전과 같은 변호사면, 다른 변호사의 첫 사례를 앞으로
    const idx = rest.findIndex((r) => r.key !== rest[0].key);
    if (idx > 0) rest.unshift(...rest.splice(idx, 1));
  }
  result.push(...rest);

  return result.map((r) => r.item);
}
