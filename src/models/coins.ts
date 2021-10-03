export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null;
  last_updated: string;
  price_change_percentage_24h_in_currency: number;
}

// ----------------------------------------------------------

export interface CodeAdditionsDeletions4_Weeks {
  additions: number;
  deletions: number;
}

export interface Image {
  thumb: string;
  small: string;
}

export interface PublicInterestStats {
  alexa_rank: number;
  bing_matches: null;
}

export interface MarketData {
  current_price: { [key: string]: number };
  market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
}

export interface CommunityData {
  facebook_likes: null;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: string;
}

export interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: CodeAdditionsDeletions4_Weeks;
  commit_count_4_weeks: number;
}

// HISTORICAL DATA
export interface CoinHistorical {
  id: string | null;
  symbol: string;
  name: string;
  image: Image;
  market_data?: MarketData;
  community_data?: CommunityData;
  developer_data?: DeveloperData;
  public_interest_stats?: PublicInterestStats;
}
