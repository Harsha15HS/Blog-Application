function TitleCard({ title }) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        {title}
      </h2>
    </div>
  );
}

export default TitleCard;
