interface SearchParams {
  query: string;
  type?: 'all' | 'hotels' | 'tours' | 'activities' | 'experiences' | 'cars' | 'pilgrimage';
  page?: number;
  limit?: number;
  sort?: 'name_asc' | 'name_desc';
}

interface SearchResponse {
  success: boolean;
  query: string;
  type: string;
  page: number;
  limit: number;
  sort: string;
  results: {
    hotels?: any[];
    tours?: any[];
    activities?: any[];
    experiences?: any[];
    cars?: any[];
    pilgrimage?: any[];
  };
}

export const searchService = {
  async globalSearch(params: SearchParams): Promise<SearchResponse> {
    const { query, type = 'all', page = 1, limit = 20, sort } = params;
    
    const searchParams = new URLSearchParams({
      query,
      type,
      page: page.toString(),
      limit: limit.toString(),
    });

    if (sort) {
      searchParams.append('sort', sort);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error('Search failed');
    }

    return response.json();
  }
};