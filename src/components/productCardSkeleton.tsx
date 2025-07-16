import { Skeleton } from "antd";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <Skeleton.Image active style={{ width: "100%", height: 180 }} className="min-w-full"/>
      <div className="mt-4">
        <Skeleton active paragraph={{ rows: 4 }} title={false} />
        <Skeleton.Input style={{ width: 120, marginTop: 16 }} active size="small" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;