import { useLayoutEffect, useRef, useState } from "react";

export interface SlidingIndicatorStyle {
  left: number;
  width: number;
}

export interface UseSlidingIndicatorOptions {
  /** 容器元素的 ref */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** 是否启用滑动指示器 */
  enabled: boolean;
  /** 选择器，用于查找激活的元素 */
  selector?: string;
  /** 监听的属性名（用于 MutationObserver） */
  attributeFilter?: readonly string[] | string[];
}

/**
 * 滑动指示器 Hook
 * 用于追踪容器内激活元素的位置和尺寸，实现平滑的滑动指示器效果
 *
 * @param options 配置选项
 * @returns 指示器样式（left, width），如果未启用或未找到元素则返回 null
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const indicatorStyle = useSlidingIndicator({
 *   containerRef,
 *   enabled: variant === "button",
 *   selector: '[data-state="active"]',
 * });
 *
 * return (
 *   <div ref={containerRef}>
 *     {indicatorStyle && (
 *       <span
 *         style={{
 *           transform: `translateX(${indicatorStyle.left}px)`,
 *           width: `${indicatorStyle.width}px`,
 *         }}
 *       />
 *     )}
 *   </div>
 * );
 * ```
 */
export function useSlidingIndicator(
  options: UseSlidingIndicatorOptions
): SlidingIndicatorStyle | null {
  const {
    containerRef,
    enabled,
    selector = '[data-state="active"]',
    attributeFilter = ["data-state"],
  } = options;

  const [indicatorStyle, setIndicatorStyle] =
    useState<SlidingIndicatorStyle | null>(null);

  // 使用 ref 存储最新的配置，避免依赖项变化导致无限循环
  const configRef = useRef<{
    selector: string;
    attributeFilter: readonly string[] | string[];
    enabled: boolean;
  }>({ selector, attributeFilter, enabled });

  // 使用 useLayoutEffect 进行 DOM 测量，避免视觉闪烁
  // 这个 hook 的目的就是测量 DOM 并更新状态，需要在 effect 中调用 setState
  /* eslint-disable */
  useLayoutEffect(() => {
    // 在 effect 中更新 ref，避免在 render 期间修改
    configRef.current = { selector, attributeFilter, enabled };
    if (!configRef.current.enabled || !containerRef.current) {
      setIndicatorStyle(null);
      return;
    }

    // 更新指示器位置的函数（在 useLayoutEffect 内部定义，避免依赖项问题）
    const updateIndicator = () => {
      // 外层已检查，这里只需检查是否找到激活元素
      const activeElement = containerRef.current!.querySelector(
        configRef.current.selector
      ) as HTMLElement;

      if (activeElement) {
        const containerRect = containerRef.current!.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();

        setIndicatorStyle({
          left: activeRect.left - containerRect.left,
          width: activeRect.width,
        });
      } else {
        setIndicatorStyle(null);
      }
    };

    // 初始更新
    updateIndicator();

    // 使用 MutationObserver 监听属性变化
    const mutationObserver = new MutationObserver(() => {
      // 使用 requestAnimationFrame 确保 DOM 更新完成
      requestAnimationFrame(() => {
        updateIndicator();
      });
    });

    mutationObserver.observe(containerRef.current, {
      attributes: true,
      attributeFilter: configRef.current.attributeFilter as string[],
      subtree: true,
      childList: false,
    });

    // 监听容器尺寸变化
    const resizeObserver = new ResizeObserver(() => {
      updateIndicator();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
    // selector, attributeFilter, enabled 变化时都需要重新设置 observer
  }, [enabled, selector, attributeFilter, containerRef]);
  /* eslint-enable */

  return indicatorStyle;
}
