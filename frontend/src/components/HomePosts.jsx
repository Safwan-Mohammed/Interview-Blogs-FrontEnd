/* eslint-disable react/prop-types */
import { IF } from "../url";

const HomePosts = ({ post }) => {
  const imageUrl = post.photo ? `${IF}${post.photo}` : null;

  return (
    <div className="h-[45vh] flex flex-wrap bg-white border border-gray-200 shadow">
      {imageUrl ? (
        <div className="overflow-hidden h-[20vh]">
          <img
            className="object-cover w-96 hover:scale-150"
            src={imageUrl}
            alt="Post"
            onError={(e) => {
              // Fallback image if the original one fails to load
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>
      ) : null}
      <div className="pl-3">
        <h5 className="text-xl font-bold tracking-tight text-gray-900">
          {post.title}
        </h5>
        <div className="text-xs font-semibold text-gray-500 items-center justify-between">
          <p className="text-blue-400">By {post.username}</p>
        </div>
        <div className="mt-2 font-normal text-gray-700">
          <p className="text-sm md:text-sm">
            {post.desc.slice(0, 75) + " ...Read more"}
          </p>
        </div>
        <div className="flex flex-wrap pt-4 text-gray-400 text-xs">
          <p>{new Date(post.updatedAt).toString().slice(3, 15)}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePosts;
