export const getProductFilters = (payload) => {
    const { search = '', populateImage = false } = payload;
    let filters = {};
    if (search) {
        filters = {
            ...filters,
            'filters[title][$contains]': search
        };
    }
    if (populateImage) {
        filters.populate = 'image'
    }
    return filters;
}