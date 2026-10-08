// 업무사례를 무작위로 섞되, 같은 변호사의 사례가 연달아 몰리지 않도록
// 변호사별로 돌아가며(라운드로빈) 배치합니다.

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

  // 변호사 순서도 매번 무작위
  const queues = shuffle([...groups.values()]);
  const result: T[] = [];
  while (queues.some((q) => q.length > 0)) {
    for (const q of queues) {
      const next = q.shift();
      if (next !== undefined) result.push(next);
    }
  }
  return result;
}
