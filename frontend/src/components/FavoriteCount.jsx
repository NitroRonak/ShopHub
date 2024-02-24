import { useSelector } from "react-redux";
const FavoriteCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;
  return (
    <div className="absolute left-4 top-[-8px] w-5 h-5 flex justify-center items-center font-bold">
      {favoriteCount > 0 && (
        <div className="text-white text-sm bg-red-500 rounded-full px-1">
          {favoriteCount}
        </div>
      )}
    </div>
  );
};

export default FavoriteCount;
