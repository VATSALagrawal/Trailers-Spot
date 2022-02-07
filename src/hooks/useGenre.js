const useGenre = (selectedGenres) => {
    return selectedGenres.map((g) => g.id).join(',');
};

export default useGenre;