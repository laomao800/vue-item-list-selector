describe('markMatch', () => {
  const markMatch = require('@/markMatch').default
  const testText = '1234567890'

  it('Empty keyword', () => {
    const markResult = markMatch(testText, '')
    expect(markResult).toEqual(testText)
  })

  it('Unmatch', () => {
    const markResult = markMatch(testText, 'a')
    expect(markResult).toEqual(testText)
  })

  it('Mark match', () => {
    const markResult = markMatch(testText, '3')
    expect(markResult).toEqual('12<span class="match">3</span>4567890')
  })

  it('Config', () => {
    const markResult = markMatch(testText, '3', {
      tag: 'div',
      className: 'keyword'
    })
    expect(markResult).toEqual('12<div class="keyword">3</div>4567890')
  })
})
