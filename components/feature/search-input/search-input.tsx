"use client";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import type { InputProps } from "@/components/ui/input";
import { Search } from "lucide-react";

/** 搜索框 props：左侧搜索图标 + InputGroupInput，透传 Input 能力 */
export type SearchInputProps = InputProps;

/**
 * 搜索框：左侧固定搜索图标 + 输入框，基于 InputGroup 封装。
 */
export function SearchInput(props: SearchInputProps) {
  const { className, mode = "dark", placeholder = "Search", ...rest } = props;
  return (
    <InputGroup mode={mode} className={className}>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder={placeholder} type="text" {...rest} />
    </InputGroup>
  );
}
