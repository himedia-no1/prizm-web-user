'use client';

import { CategorySection } from '@/components/layout/LeftSidebar/CategorySection';

export const CategoryGroup = ({
  title,
  categories,
  currentChannelId,
  currentView,
  onSelectChannel,
}) => {
  if (!categories?.length) {
    return null;
  }

  return (
    <div className="nav-group">
      <div className="nav-group__header">
        <span>{title}</span>
      </div>
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          currentChannelId={currentChannelId}
          currentView={currentView}
          onSelectChannel={onSelectChannel}
        />
      ))}
    </div>
  );
};
