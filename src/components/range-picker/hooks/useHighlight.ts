function findAllOccurrences(source: string, searchString: string) {
  const positions: number[] = []
  let pos = source.indexOf(searchString)

  // 使用循环来查找所有出现的位置
  while (pos > -1) {
    positions.push(pos)
    pos = source.indexOf(searchString, pos + 1) // 从上一个找到的位置之后开始查找
  }

  return positions
}
/**
 * 高亮文字
 * @param keyWord 关键词，用来匹配高亮的文本
 * @param selector 需要高亮的节点的类名称
 * @param rootNode 根节点，符合规则的后代节点匹配高亮,主要是为了无痛替换 use-search-hi
 * @param cssName 高亮用的 css 样式对应的类名，请参照 CSS highlight API文档使用。
 * 在支持 highlight api 的浏览器上 css 样例如右：.highlight-node::highlight(cssName) {
 *  color: #fd9800;
 * }
 * 在不支持 highlight api 的浏览器上，css 样例如右：.cssName{
 *  color: #fd9800;
 * }
 */
export function useHighlight({
  keyWord,
  selector,
  rootNode,
  cssName = 'search-results'
}: {
  keyWord: string
  selector: string
  rootNode?: HTMLElement
  cssName?: string
}) {
  const isCSSHighlightEnabled = window.Highlight
  // 保证 Dom 节点已渲染完毕
  if (!selector) {
    return
  }
  // 用户应当只清除自己传入的cssName
  if (isCSSHighlightEnabled) {
    CSS.highlights?.delete(cssName)
  } else {
    const marks = Array.from(rootNode?.getElementsByClassName(cssName) || [])
    marks.forEach((mark) => {
      const parentElement = mark.parentElement
      if (mark.textContent) {
        const textNode = document.createTextNode(mark.textContent as string)
        // 将标记节点替换为新的文本节点
        parentElement?.replaceChild(textNode, mark)
      }
      parentElement?.normalize()
    })
  }
  if (!keyWord) {
    return
  }
  const allNodes = Array.from(rootNode?.getElementsByClassName(selector) || [])
  const allTextNodes: Node[] = []
  // 把文本子节点都捞出来
  allNodes.forEach((node) => {
    const treeWalker = document.createTreeWalker(node as Node, NodeFilter.SHOW_TEXT)
    let currentNode = treeWalker.nextNode()
    while (currentNode) {
      allTextNodes.push(currentNode)
      currentNode = treeWalker.nextNode()
    }
  })
  const elInfoList = allTextNodes
    .map((el) => {
      // 英文全部小写
      return { el, text: el?.textContent?.toLowerCase() }
    })
    .map(({ text, el }) => {
      const posArray = findAllOccurrences(text as string, keyWord?.toLowerCase()).map((start) => {
        return [start, start + keyWord.length]
      })

      return { posArray, el }
    })
    .filter((item) => item.posArray.length > 0)
  const ranges: Range[] = []
  elInfoList.forEach((item) => {
    const { posArray } = item
    posArray.forEach((pos) => {
      const range = new Range()
      range.setStart(item.el, pos[0])
      range.setEnd(item.el, pos[1])
      ranges.push(range)
    })
  })
  if (isCSSHighlightEnabled) {
    const searchResultsHighlight = new Highlight(...ranges)
    CSS.highlights.set(cssName, searchResultsHighlight)
  } else {
    ranges.forEach((range) => {
      const mark = document.createElement('span')
      mark.className = cssName
      range.surroundContents(mark)
    })
  }
}
