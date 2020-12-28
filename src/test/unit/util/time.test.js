import { time } from '../../../util/time.js'

describe('time', () => {
  it('time', () => {
    const res = time()
    expect(res).toBe(1)
  })
})