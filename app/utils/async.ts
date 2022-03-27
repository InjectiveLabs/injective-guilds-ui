export const sleep = (timeout: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, timeout))

export const backupPromiseCall = async <T>(promise: () => Promise<T>) => {
  await promise()
  await sleep(1000)

  sleep(3000).then(async () => {
    await promise()
  })
}

export const delayPromiseCall = async <T>(
  promise: () => Promise<T>,
  seconds: number
) => {
  await sleep(seconds).then(async () => {
    await promise()
  })
}
