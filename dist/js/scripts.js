const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

const sliderContainers = document.querySelectorAll('.block-slider__slider');
if (sliderContainers.length) {
  sliderContainers.forEach((container, index) => {
    const prevEl = container.closest('.block-slider').querySelector('.block-slider__arrow-prev');
    const nextEl = container.closest('.block-slider').querySelector('.block-slider__arrow-next');

    new Swiper(container, {
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      speed: 400,
      navigation: {
        prevEl: prevEl,
        nextEl: nextEl,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 1.2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 1.7,
        },
        992: {
          slidesPerView: 2.5,
        },
        1300: {
          slidesPerView: 3,
        },
      },
    });
  });
}

if (document.querySelector('.block-intro__slider')) {
  const blockIntro = new Swiper('.block-intro__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    speed: 400,
    spaceBetween: 20,
    loop: true,
    lazy: true,
    pagination: {
      el: ".block-intro__pagination-fraction",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        // Форматируем числа с ведущим нулем
        const formattedCurrent = current.toString().padStart(2, '0');
        const formattedTotal = total.toString().padStart(2, '0');
        return `<span class="swiper-pagination-current">${formattedCurrent}</span> / <span class="swiper-pagination-total">${formattedTotal}</span>`;
      }
    },
    navigation: {
      prevEl: '.block-intro__arrow-prev',
      nextEl: '.block-intro__arrow-next',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
}

if (document.querySelector('.images-product')) {
  const thumbsSwiper = new Swiper('.images-product__thumb', {
    observer: true,
    observeParents: true,
    slidesPerView: 5,
    spaceBetween: 15,
    speed: 400,
    preloadImages: true,
    direction: "vertical",
    navigation: {
      prevEl: '.images-product__arrow-prev',
      nextEl: '.images-product__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 2.5,
        spaceBetween: 10,
        direction: "horizontal",
      },
      480: {
        slidesPerView: 3.5,
        spaceBetween: 10,
        direction: "horizontal",
      },
      768: {
        slidesPerView: 4.8,
        spaceBetween: 10,
        direction: "horizontal",
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 15,
        direction: "vertical",
      },
    },
  });

  const mainThumbsSwiper = new Swiper('.images-product__slider', {
    thumbs: {
      swiper: thumbsSwiper
    },
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 400,
    preloadImages: true,
    navigation: {
      prevEl: '.images-product__arrow-prev',
      nextEl: '.images-product__arrow-next',
    },
  });
}

if (document.querySelector('.top-block-filter__slider')) {
  const blockFilter = new Swiper('.top-block-filter__slider', {
    observer: true,
    observeParents: true,
    speed: 400,
    navigation: {
      prevEl: '.top-block-filter__arrow-prev',
      nextEl: '.top-block-filter__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
        grid: {
          rows: 1,
          fill: 'row',
        },
      },
      360: {
        slidesPerView: 2,
        spaceBetween: 20,
        grid: {
          rows: 1,
          fill: 'row',
        },
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 10,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 30,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
    },
  });
}

//========================================================================================================================================================

//Фильтр
const filterButtons = document.querySelectorAll('.bottom-block-filter__navigation button');
const cartItems = document.querySelectorAll('.bottom-block-filter .cart-item');
if (filterButtons) {
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filterValue = this.getAttribute('data-filter');

      filterButtons.forEach(btn => btn.classList.remove('_active'));
      this.classList.add('_active');

      cartItems.forEach(item => {
        const itemFilter = item.getAttribute('data-filter');

        if (filterValue === 'all' || itemFilter === filterValue) {
          item.classList.remove('_hide');
        } else {
          item.classList.add('_hide');
        }
      });
    });
  });
}

//========================================================================================================================================================

function indents() {
  const blockDescr = document.querySelector('.block-product-card');
  const container = document.querySelector('.container');

  if (blockDescr) {
    let wblockDescr = window.getComputedStyle(blockDescr).width;
    wblockDescr = parseFloat(wblockDescr);

    let wcontainer = window.getComputedStyle(container).width;
    wcontainer = parseFloat(wcontainer);

    const blockDescrSum = (wblockDescr - wcontainer) / 2;

    const tabsBodies = document.querySelectorAll('.tabs__body');

    tabsBodies.forEach(tabsBody => {
      tabsBody.style.marginLeft = `-${blockDescrSum + 20}px`;
      tabsBody.style.width = `calc(100% + ${blockDescrSum * 2 + 40}px)`;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  indents();
});
window.addEventListener('resize', indents);
window.addEventListener('scroll', indents);

//========================================================================================================================================================

//Меню
const iconMenu = document.querySelector('.icon-menu');
const headerMenu = document.querySelector('.header__menu');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    document.documentElement.classList.toggle("menu-open");
  });
  document.addEventListener('click', function (e) {
    const isClickInsideheaderMenu = headerMenu && headerMenu.contains(e.target);
    const isClickOnMenuIcon = e.target === iconMenu || iconMenu.contains(e.target);

    if (!isClickInsideheaderMenu && !isClickOnMenuIcon) {
      document.documentElement.classList.remove("menu-open");
    }
  });
}

//Каталог
const headerTitles = document.querySelector('.catalog-header__button');
if (headerTitles) {
  function openCatalog() {
    document.documentElement.classList.add('catalog-open');
  }

  function closeCatalog() {
    document.documentElement.classList.remove('catalog-open');
  }

  headerTitles.addEventListener('click', function (e) {
    e.stopPropagation();
    if (document.documentElement.classList.contains('catalog-open')) {
      closeCatalog();
    } else {
      openCatalog();
    }
  });

  // Обработчик клика по документу (закрытие при клике вне)
  document.addEventListener('click', function (e) {
    if (document.documentElement.classList.contains('catalog-open') && !headerTitles.contains(e.target)) {
      closeCatalog();
    }
  });
}

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

document.addEventListener('DOMContentLoaded', () => {
  const revealClasses = ['title1', 'title2'];
  const visibleClass = 'is-visible';
  const isMobile = window.innerWidth < 768;

  const style = document.createElement('style');
  style.textContent = revealClasses.map(cls => `
    .${cls} {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
      transition-delay: 0.12s;
      will-change: opacity, transform;
    }
    .${cls}.${visibleClass} {
      opacity: 1;
      transform: translateY(0);
    }
  `).join('\n');
  document.head.appendChild(style);

  const excludedSelectors = ['.no-reveal', '.disable-reveal'];

  function isExcluded(el) {
    return excludedSelectors.some(sel =>
      el.matches(sel) || el.closest(sel)
    );
  }

  const revealElements = revealClasses.flatMap(cls =>
    Array.from(document.querySelectorAll(`.${cls}`))
  );

  revealElements.forEach(el => {
    if (isMobile && isExcluded(el)) {
      revealClasses.forEach(cls => el.classList.remove(cls));
      // Сброс inline-стилей
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
      el.style.willChange = '';
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
        } else {
          entry.target.classList.remove(visibleClass);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      if (!(isMobile && isExcluded(el))) {
        observer.observe(el);
      }
    });
  } else {
    console.warn('IntersectionObserver не поддерживается в этом браузере.');
  }
});

//========================================================================================================================================================

//Табы
function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }

    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }

  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');

      tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);

      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }

  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
      tabsActiveTitle?.classList.remove('_tab-active');
    }

    if (tabsContent.length) {
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
      });
    }
    setTabsStatus(tabsBlock);
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

    function isTabsAnimate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
      return false;
    }
    const tabsBlockAnimate = isTabsAnimate(tabsBlock);

    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);

      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate, () => {
              const event = new CustomEvent("tabChanged", {
                detail: { tabContent: tabsContentItem }
              });
              document.dispatchEvent(event);
            });
          } else {
            tabsContentItem.hidden = false;
            // Trigger showmore init immediately
            const event = new CustomEvent("tabChanged", {
              detail: { tabContent: tabsContentItem }
            });
            document.dispatchEvent(event);
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
        let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
        tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock);
        tabActiveTitle[0]?.classList.remove('_tab-active');
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
tabs();

//========================================================================================================================================================

//Показать еще
function showMore() {
  window.addEventListener("load", function () {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]');
    let showMoreBlocksRegular;
    let mdQueriesArray;

    function calculateContentHeight(content, block) {
      const showMoreType = block.dataset.showmore;

      if (showMoreType === 'items' && !content.classList.contains('bottom-block-filter__body')) {
        const itemsToShow = parseInt(content.dataset.showmoreContent) || 1;
        const paragraphs = content.querySelectorAll('p');
        if (paragraphs.length === 0) return 0;

        const contentStyles = getComputedStyle(content);
        const gap = parseFloat(contentStyles.gap) || 0;

        let height = 0;
        let paragraphsCounted = 0;

        for (let i = 0; i < paragraphs.length; i++) {
          if (paragraphsCounted >= itemsToShow) break;

          const p = paragraphs[i];
          const styles = getComputedStyle(p);
          height += p.offsetHeight +
            parseFloat(styles.marginTop) +
            parseFloat(styles.marginBottom);

          if (i < itemsToShow - 1 && i < paragraphs.length - 1) {
            height += gap;
          }

          paragraphsCounted++;
        }

        return Math.ceil(height);
      }
      else if (content.classList.contains('bottom-block-filter__body')) {
        const items = content.querySelectorAll('.cart-item');
        if (items.length <= 6) return null;

        const gridStyles = getComputedStyle(content);
        const rowGap = parseFloat(gridStyles.rowGap) || 0;
        const gridTemplateColumns = gridStyles.gridTemplateColumns.split(' ').length;

        const itemsToShow = 6;
        const itemsPerRow = Math.min(gridTemplateColumns, itemsToShow);
        const rowsToShow = Math.ceil(itemsToShow / itemsPerRow);

        let rowHeights = [];
        let itemsCounted = 0;

        for (let row = 0; row < rowsToShow; row++) {
          let maxRowHeight = 0;

          for (let col = 0; col < itemsPerRow; col++) {
            const index = row * itemsPerRow + col;
            if (index >= items.length || itemsCounted >= itemsToShow) break;

            const item = items[index];
            const styles = getComputedStyle(item);
            const itemHeight = item.offsetHeight +
              parseFloat(styles.marginTop) +
              parseFloat(styles.marginBottom);

            if (itemHeight > maxRowHeight) {
              maxRowHeight = itemHeight;
            }
            itemsCounted++;
          }

          if (maxRowHeight > 0) {
            rowHeights.push(maxRowHeight);
          }
        }

        let totalHeight = rowHeights.reduce((sum, height) => sum + height, 0);
        if (rowGap && rowHeights.length > 1) {
          totalHeight += (rowHeights.length - 1) * rowGap;
        }

        return Math.ceil(totalHeight);
      }
      else {
        return parseInt(content.dataset.showmoreContent) || 150;
      }
    }

    if (showMoreBlocks.length) {
      showMoreBlocks.forEach(block => {
        const content = block.querySelector('[data-showmore-content]');
        if (content) {
          const calculatedHeight = calculateContentHeight(content, block);
          if (calculatedHeight !== null) {
            content.dataset.calculatedHeight = calculatedHeight;
            if (!block.classList.contains('_showmore-active')) {
              content.style.height = `${calculatedHeight}px`;
            }
          }
        }
      });

      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(item => !item.dataset.showmoreMedia);
      if (showMoreBlocksRegular.length) initItems(showMoreBlocksRegular);

      document.addEventListener("click", function (e) {
        if (e.target.closest('[data-showmore-button]')) {
          const showMoreButton = e.target.closest('[data-showmore-button]');
          const showMoreBlock = showMoreButton.closest('[data-showmore]');
          const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
          const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? parseInt(showMoreBlock.dataset.showmoreButton) : 500;

          if (!showMoreContent.classList.contains('_slide')) {
            const hiddenHeight = parseInt(showMoreContent.dataset.calculatedHeight) ||
              parseInt(showMoreContent.dataset.showmoreContent) ||
              150;

            if (showMoreBlock.classList.contains('_showmore-active')) {
              showMoreContent.style.height = `${hiddenHeight}px`;
              _slideUp(showMoreContent, showMoreSpeed, hiddenHeight);
            } else {
              showMoreContent.style.height = '';
              _slideDown(showMoreContent, showMoreSpeed, getOriginalHeight(showMoreContent));
            }
            showMoreBlock.classList.toggle('_showmore-active');
          }
        }
      });

      let resizeTimeout;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
          showMoreBlocks.forEach(block => {
            const content = block.querySelector('[data-showmore-content]');
            if (content) {
              const calculatedHeight = calculateContentHeight(content, block);
              if (calculatedHeight !== null) {
                content.dataset.calculatedHeight = calculatedHeight;
                if (!block.classList.contains('_showmore-active')) {
                  content.style.height = `${calculatedHeight}px`;
                }
              }
            }
          });
          showMoreBlocksRegular?.length && initItems(showMoreBlocksRegular);
          mdQueriesArray?.length && initItemsMedia(mdQueriesArray);
        }, 100);
      });

      document.addEventListener("tabChanged", function (e) {
        const tabContent = e.detail.tabContent;
        const showMoreBlocksInTab = tabContent.querySelectorAll('[data-showmore]');
        if (showMoreBlocksInTab.length) {
          setTimeout(() => {
            showMoreBlocksInTab.forEach(block => {
              const content = block.querySelector('[data-showmore-content]');
              if (content) {
                const calculatedHeight = calculateContentHeight(content, block);
                if (calculatedHeight) {
                  content.dataset.calculatedHeight = calculatedHeight;
                  initItem(block);
                }
              }
            });
          }, 50);
        }
      });

      mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach(mdQueriesItem => {
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
        });
        initItemsMedia(mdQueriesArray);
      }
    }

    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach(mdQueriesItem => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }

    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach(showMoreBlock => {
        initItem(showMoreBlock, matchMedia);
      });
    }

    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
      const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
      const showMoreButton = showMoreBlock.querySelector('[data-showmore-button]');

      if (!showMoreContent || !showMoreButton) return;

      const hiddenHeight = parseInt(showMoreContent.dataset.calculatedHeight) ||
        parseInt(showMoreContent.dataset.showmoreContent) ||
        150;

      if (matchMedia?.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          showMoreContent.style.height = `${hiddenHeight}px`;
          _slideUp(showMoreContent, 0, showMoreBlock.classList.contains('_showmore-active') ? getOriginalHeight(showMoreContent) : hiddenHeight);
          showMoreButton.hidden = false;
        } else {
          showMoreContent.style.height = '';
          _slideDown(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = true;
        }
      } else {
        showMoreContent.style.height = '';
        _slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    }

    function getOriginalHeight(showMoreContent) {
      const tabParent = showMoreContent.closest('.tabs__body');
      let originalStyles = {};
      let originalHeight;

      if (tabParent && tabParent.style.display === 'none') {
        originalStyles = {
          display: tabParent.style.display,
          visibility: tabParent.style.visibility,
          position: tabParent.style.position
        };
        tabParent.style.display = 'block';
        tabParent.style.visibility = 'hidden';
        tabParent.style.position = 'absolute';
      }

      const currentHeight = showMoreContent.offsetHeight;
      showMoreContent.style.removeProperty('height');
      originalHeight = showMoreContent.offsetHeight;
      showMoreContent.style.height = `${currentHeight}px`;

      if (tabParent && originalStyles.display !== undefined) {
        tabParent.style.display = originalStyles.display;
        tabParent.style.visibility = originalStyles.visibility;
        tabParent.style.position = originalStyles.position;
      }

      return originalHeight;
    }
  });
}
showMore();