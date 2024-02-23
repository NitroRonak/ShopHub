import { useSelector } from "react-redux";
const FavoriteCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;
  return (
    <div className="absolute left-4 bottom-4">
      {favoriteCount > 0 && (
        <div className="text-white text-xs bg-red-500 rounded-full px-1">
          {favoriteCount}
        </div>
      )}
    </div>
  );
};

export default FavoriteCount;
