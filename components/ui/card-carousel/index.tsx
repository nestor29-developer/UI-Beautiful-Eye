const ItemsCardCarousel = ({
  img,
  title,
  content,
}: {
  img: string;
  title: string;
  content: string;
}) => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="rounded-full bg-slate-100 p-6 h-16 w-16 flex justify-center items-center">
        <img className="h-8 absolute" src={`/icons/${img}`} alt={`${img}`} />
      </div>

      <p className="text-xl font-bold mt-1.5">{title}</p>
      <span
        className="text-base text-slate-500"
        dangerouslySetInnerHTML={{ __html: content }}
      ></span>
    </div>
  );
};

export const CardCarousel = ({ listItems }: { listItems: any[] }) => {
  return (
    <div className=" mx-16 shadow-lg shadow-slate-300 rounded-md border-[1px]">
      <div className="p-16 grid grid-cols-3 gap-4 text-center">
        {listItems &&
          listItems.length > 0 &&
          listItems.map((item) => {
            return (
              <ItemsCardCarousel
                img={item.icon}
                title={item.title}
                content={item.description}
              />
            );
          })}
      </div>
    </div>
  );
};
