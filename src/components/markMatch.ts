/**
 * 标记关键字
 * @param  {String} text    待处理字符串
 * @param  {String} keyword 关键字
 * @param  {Object} config  { tag: 生成标记 html 标签, className: 生成标记 html 标签 class 属性值 }
 * @return {String}         标记出关键字后的字符串
 */
export default function markMatch (text: string, keyword: string, config: { tag?: string, className?: string } = {}): string {
  const { tag = 'span', className = 'match' } = config
  // tslint:disable-next-line
  if (!keyword || !(keyword = keyword.trim())) {
    return text
  } else {
    const escapedKeyword = keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    const reg = new RegExp(escapedKeyword, 'gi')
    return text.replace(reg, match => `<${tag} class="${className}">${match}</${tag}>`)
  }
}
