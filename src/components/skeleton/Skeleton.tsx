export function Skeleton() {
  return (
    <section className="bg-white w-full h-screen flex flex-col justify-center items-center">
      <div className="container px-6 py-8 mx-auto animate-pulse">
        <div className="text-center">
          <p className="w-32 h-2 mx-auto bg-gray-200 rounded-lg "></p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <p className="w-24 h-2 bg-gray-200 rounded-lg "></p>
            <p className="w-24 h-2 bg-gray-200 rounded-lg "></p>
            <p className="w-24 h-2 bg-gray-200 rounded-lg "></p>
            <p className="w-24 h-2 bg-gray-200 rounded-lg "></p>
            <p className="w-24 h-2 bg-gray-200 rounded-lg "></p>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 " />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="w-24 h-2 bg-gray-200 rounded-lg "></p>

          <p className="w-64 h-2 bg-gray-200 rounded-lg "></p>
        </div>
      </div>
    </section>
  );
}
