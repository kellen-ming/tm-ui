"use client";

import Link from "next/link";

import type { CellContent, ComparisonGroup } from "@/components/feature/comparison-table";

const SECTION_TITLE_CLASS = "bg-bgc-secondary-black-default text-secondary-gray-default text-md font-semibold";

const CHECK_WHITE: CellContent = { type: "check", color: "#FFF" };
const CHECK_PRO: CellContent = { type: "check", color: "#7A5AF8" };

function cells(config: {
  free?: CellContent;
  basic?: CellContent;
  pro?: CellContent;
  enterprise?: CellContent;
}): Record<string, CellContent> {
  const out: Record<string, CellContent> = {};
  if (config.free != null) out.free = config.free;
  if (config.basic != null) out.basic = config.basic;
  if (config.pro != null) out.pro = config.pro;
  if (config.enterprise != null) out.enterprise = config.enterprise;
  return out;
}

/**
 * 从 ComparePlans 一致的真实数据生成 ComparisonTable 的 groups。
 * @param couriersCount 物流商数量，用于「Integration with N couriers」标题
 */
export function getComparePlansTableGroups(couriersCount: string): ComparisonGroup[] {
  const transitTranslationHref =
    "https://support.trackingmore.com/en/article/how-to-use-translation-features-for-api-users-12ycf7z/";
  const additionalCreditHref =
    "https://support.trackingmore.com/en/article/trackingmore-billing-explained-credits-and-sms-fees-hychoa/";

  return [
    {
      title: "Shipment management",
      titleClassName: SECTION_TITLE_CLASS,
      rows: [
        {
          label: `Integration with ${couriersCount} couriers`,
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Shipment visibility dashboard",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Standardized tracking statuses",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Auto-detect carrier",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Advanced search and filters",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Bulk import shipment data",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Custom labels",
          cells: cells({ basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Bulk export shipment data",
          cells: cells({ basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Carrier auto-correction",
          cells: cells({ pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: (
            <Link
              className='text-primary-gray-default underline hover:underline'
              target='_blank'
              href={transitTranslationHref}>
              Transit history translation
            </Link>
          ),
          cells: cells({
            pro: { type: "link", text: "Additional credit", href: additionalCreditHref },
            enterprise: { type: "link", text: "Additional credit", href: additionalCreditHref },
          }),
        },
      ],
    },
    {
      title: "Tracking page",
      titleClassName: SECTION_TITLE_CLASS,
      rows: [
        {
          label: "Customizable tracking page",
          cells: cells({
            free: { type: "text", value: "1" },
            basic: { type: "text", value: "4" },
            pro: { type: "custom", render: () => <span className='text-[#7A5AF8]'>10</span> },
            enterprise: { type: "text", value: "20" },
          }),
        },
        {
          label: "Drag-and-drop page editor",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Order lookup widget",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Tracking page EDD",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Embedded tracking pages",
          cells: cells({ pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Multilingual tracking pages",
          cells: cells({ basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Multilingual checkpoint events",
          cells: cells({ pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Customer feedback survey",
          cells: cells({ pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Remove TrackingMore branding",
          cells: cells({ pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
      ],
    },
    {
      title: "Customer notification",
      titleClassName: SECTION_TITLE_CLASS,
      rows: [
        {
          label: "Email notifications",
          cells: cells({ basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "SMS notifications",
          cells: cells({
            basic: { type: "text", value: "Additional charge" },
            pro: {
              type: "custom",
              render: () => <span className='text-[#7A5AF8]'>Additional charge</span>,
            },
            enterprise: { type: "text", value: "Additional charge" },
          }),
        },
        {
          label: "Drag-and-drop page editor",
          cells: cells({ basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Notification report",
          cells: cells({ basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
      ],
    },
    {
      title: "Post-purchase estimated delivery dates (EDD)",
      titleClassName: SECTION_TITLE_CLASS,
      rows: [
        {
          label: "Carrier EDD integration",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Custom EDD integration",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
      ],
    },
    {
      title: "Analytics",
      titleClassName: SECTION_TITLE_CLASS,
      rows: [
        {
          label: "Shipment performance report",
          cells: cells({ basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Tracking pages engagement report",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
      ],
    },
    {
      title: "Integration",
      titleClassName: SECTION_TITLE_CLASS,
      rows: [
        {
          label: "Extensive eCommerce integrations",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Klaviyo integration",
          cells: cells({ pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Tracking API and webhook",
          cells: cells({ pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "API rate limit",
          cells: cells({
            pro: {
              type: "custom",
              render: () => <span className='text-[#7A5AF8]'>10 res/sec</span>,
            },
            enterprise: CHECK_WHITE,
          }),
        },
        {
          label: "Custom integrations",
          cells: cells({ enterprise: CHECK_WHITE }),
        },
        {
          label: "Custom carrier integration",
          cells: cells({ enterprise: CHECK_WHITE }),
        },
      ],
    },
    {
      title: "General",
      titleClassName: SECTION_TITLE_CLASS,
      rows: [
        {
          label: "Self-service help center",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "24/7 live chat support",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "24/7 email support",
          cells: cells({ free: CHECK_WHITE, basic: CHECK_WHITE, pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Member account",
          cells: cells({ pro: CHECK_PRO, enterprise: CHECK_WHITE }),
        },
        {
          label: "Dedicated Account Manager",
          cells: cells({ enterprise: CHECK_WHITE }),
        },
      ],
    },
  ];
}
