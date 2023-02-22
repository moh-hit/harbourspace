import React from 'react'
import isEqual from 'lodash/isEqual'

class Draggable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listRef: [],
      dropIndex: null,
    }
  }

  componentDidMount() {
    const { children } = this.props
    const listRef = React.Children.toArray(children).map((item, index) => ({
      nodeRef: item,
      nodeKey: `${index}_node`,
      renderIndex: index,
    }))
    debugger
    this.setState({ listRef })
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props
    if (!isEqual(prevProps.children, children)) {
      const listRef = React.Children.toArray(children).map((item, index) => ({
        nodeRef: item,
        nodeKey: `${index}_node`,
        renderIndex: index,
      }))
      debugger
      this.setState({ listRef })
    }
  }

  onDragEnter = (ev, index) => {
    if (index === this.draggedEleIndex) {
      this.setState({ dropIndex: null })
      return
    }
    const { dropIndex } = this.state
    if (!dropIndex) {
      this.direction = index > this.draggedEleIndex ? 'down' : 'up'
      this.setState({ dropIndex: index })
    }
  }

  onDrop = (ev, index) => {
    ev.preventDefault()
    if (index === this.draggedEleIndex) {
      this.setState({ dropIndex: null })
      return
    }
    // const dragEle = ev.dataTransfer.getData('text/plain')
    // const up = index > this.draggedEleIndex
    // ev.currentTarget.style.transform = `translate3d(0, ${up ? '-60px' : '60px'}, 15px)`
    const { listRef } = this.state
    const modList = [...listRef]
    if (index > this.draggedEleIndex) {
      const constant = modList.splice(0, this.draggedEleIndex)
      const end = modList.splice(index - this.draggedEleIndex + 1, modList.length)
      const dragEle = modList.shift()
      modList.push(dragEle)
      this.setState({ listRef: [...constant, ...modList, ...end], dropIndex: null })
    } else {
      const constant = modList.splice(0, index)
      const end = modList.splice(this.draggedEleIndex - index + 1, modList.length)
      const dragEle = modList.pop()
      modList.unshift(dragEle)
      this.setState({ listRef: [...constant, ...modList, ...end], dropIndex: null })
    }
  }

  onDragLeave = () => {}

  onDrag = (ev, index) => {
    ev.preventDefault()
    ev.stopPropagation()
    this.draggedEleIndex = index
    this.draggedEle = ev.currentTarget.id
    ev.currentTarget.style.opacity = 0
  }

  onDragOver = (ev) => {
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'move'
    ev.dataTransfer.effectAllowed = 'move'
  }

  render() {
    const { listRef, dropIndex } = this.state
    return listRef.map((item, index) => {
      const { nodeRef, nodeKey } = item
      const style = {}
      // transform: this.draggedEleIndex > index ? 'translate(0, 100%)' : 'translate(0, -100%)',

      console.log(style, dropIndex, index, 'lol inde')
      return (
        <div
          key={nodeKey}
          onDragEnter={e => this.onDragEnter(e, index)}
          onDrop={e => this.onDrop(e, index)}
          onDragLeave={e => this.onDragLeave(e, index)}
          onDragOver={this.onDragOver}
          style={{ backgroundColor: 'grey' }}
        >
          <div
            onDrag={e => this.onDrag(e, index)}
            onDragEnd={(ev) => { ev.currentTarget.style.opacity = 1 }}
            style={{ ...style, transition: 'all 0.8s', backgroundColor: 'yello' }}
            draggable
          >
            {nodeRef}
          </div>
        </div>
      )
    })
  }
}

export default Draggable
