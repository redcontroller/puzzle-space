import type { Space, RecentSpace, PopularSpace, AdSpace } from './space';

export interface SpaceItemProps {
  space?: Space;
  adSpace?: AdSpace;
  onSpaceClick?: (space: Space | AdSpace) => void;
  onFavoriteClick?: (space: Space | AdSpace) => void;
  onAdClick?: (space: AdSpace) => void;
  className?: string;
  showFavoriteButton?: boolean;
}

export interface RecentSpaceCardProps {
  space: RecentSpace;
  onClick?: (space: RecentSpace) => void;
  className?: string;
}

export interface PopularSpaceItemProps {
  space: PopularSpace;
  onClick?: (space: PopularSpace) => void;
  className?: string;
}
