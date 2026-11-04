// 업무사례를 무작위로 섞되, 같은 변호사의 사례가 한쪽에 몰리지 않도록
// 변호사별 사례를 목록 전체에 고르게 흩어 배치합니다.
// (사례 수가 적은 변호사도 앞쪽에만 몰리지 않고 끝까지 고르게 섞입니다.)

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function diversifyByAuthor<T>(items: T[], getAuthorKey: (item: T) => string): T[] {
  const groups = new Map<string, T[]>();
  for (const item of shuffle(items)) {
    const key = getAuthorKey(item);
    const group = groups.get(key);
    if (group) group.push(item);
    else groups.set(key, [item]);
  }

  // 변호사마다 사례 n건을 0~1 구간의 n칸에 하나씩 놓고(칸 안 위치는 무작위),
  // 위치 순으로 정렬합니다. 사례가 많은 변호사는 촘촘히, 적은 변호사는 듬성듬성 전체에 퍼집니다.
  const placed: { item: T; pos: number }[] = [];
  for (const group of groups.values()) {
    const n = group.length;
    const offset = Math.random() * 0.5;
    group.forEach((item, i) => {
      placed.push({ item, pos: (i + offset + Math.random() * 0.5) / n });
    });
  }
  placed.sort((a, b) => a.pos - b.pos);
  return placed.map((p) => p.item);
}
