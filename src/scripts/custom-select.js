class CustomAccessibleSelect {
  constructor(container,
    {
      SPACEBAR_CODE,
      ENTER_CODE,
      ESCAPE_CODE,
      DOWN_ARROW_CODE,
      UP_ARROW_CODE
    },
    {
      selectedNode,
      dropdownListContainer,
      dropdownList,
      dropdownListItems
    }
  ) {
    // this.container = document.querySelector(container);
    this.container = container
    this.selectedNode = this.container.querySelector(selectedNode);
    this.dropdownListContainer = this.container.querySelector(dropdownListContainer);
    this.dropdownList = this.container.querySelector(dropdownList);
    this.dropdownListItems = this.container.querySelectorAll(dropdownListItems);

    this.SPACEBAR_CODE = SPACEBAR_CODE;
    this.ENTER_CODE = ENTER_CODE;
    this.ESCAPE_CODE = ESCAPE_CODE;
    this.DOWN_ARROW_CODE = DOWN_ARROW_CODE;
    this.UP_ARROW_CODE = UP_ARROW_CODE;

    this.activeIndex = 0;
    this.pressOpenedKey = null;

  }

  initEvents() {
    this.selectedNode.addEventListener('click', this.toggleDropdownVisibility.bind(this))
    this.selectedNode.addEventListener('keydown', this.toggleDropdownVisibility.bind(this))
    document.addEventListener('click', this.onOutsideClickClose.bind(this))
  }

  onOutsideClickClose(e) {
    if (!(this.dropdownList.classList.contains('open'))) return

    if (e.target.closest('.custom-select')) return

    this.dropdownClose()
  }

  toggleDropdownVisibility(e) {
    this.pressOpenedKey = e.code === this.SPACEBAR_CODE || e.code === this.ENTER_CODE

    if (e.type === 'click' || this.pressOpenedKey) {
      e.preventDefault()
      this.dropdownList.classList.toggle('open')
      this.dropdownListContainer.setAttribute('aria-expended', this.dropdownList.classList.contains('open'))
    }

    if (e.code === this.ESCAPE_CODE) {
      this.dropdownClose()
    }

    if (e.code === this.DOWN_ARROW_CODE) {
      this.focusNextItem(e)
    }

    if (e.code === this.UP_ARROW_CODE) {
      this.focusPrevItem(e)
    }
  }

  dropdownClose() {
    this.dropdownList.classList.remove('open')
    this.dropdownListContainer.setAttribute('aria-expended', false)
  }

  setSelectedItem(e) {
    this.selectedNode.value = e.target.textContent
  }

  focusNextItem(e) {
    e.preventDefault()
    if (this.activeIndex > this.dropdownListItems.length - 1) return
    this.dropdownListItems[this.activeIndex].focus()
    this.activeIndex++

  }

  focusPrevItem(e) {
    e.preventDefault()
    if (this.activeIndex <= 0) return
    this.activeIndex--
    this.dropdownListItems[this.activeIndex].focus()
  }

  setSelectedItem(e) {
    this.selectedNode.value = e.target.textContent
  }

  renderItems() {
    this.dropdownListItems.forEach(item => {
      item.addEventListener('click', (e) => {
        this.setSelectedItem(e)
        this.dropdownClose()
      })

      item.addEventListener('keydown', (e) => {
        switch (e.code) {
          case this.ENTER_CODE:
            this.setSelectedItem(e)
            this.dropdownClose()
            break;
          case this.ESCAPE_CODE:
            this.dropdownClose()
            break;
          case this.DOWN_ARROW_CODE:
            this.focusNextItem(e)
            break;
          case this.UP_ARROW_CODE:
            this.focusPrevItem(e)
            break;
          default:
            break;
        }
      })
    })
  }

}

export { CustomAccessibleSelect }