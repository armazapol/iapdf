import Image from "next/image";

interface StepProps {
  title: string;
  description: string;
  isCompleted: boolean;
  isShow: boolean;
  children: React.ReactNode;
  lastStep?: boolean;
}

const CheckIcon = () => (
  <Image src={"/check.png"} alt="check" width={20} height={20} />
);

const Step = ({
  title,
  description,
  isCompleted,
  isShow,
  children,
  lastStep,
}: StepProps) => (
  <div className={`mb-3 ${!isCompleted && !isShow ? "opacity-50" : ""}`}>
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      {isCompleted && <CheckIcon />}
    </div>
    <p className={`text-gray-600 ${isCompleted ? "opacity-50" : ""}`}>
      {description}
    </p>
    {lastStep ? (
      <div className={`mt-3 ${isCompleted && !isShow ? "block" : "hidden"}`}>
        {children}
      </div>
    ) : (
      <div className={`mt-3 ${isCompleted || !isShow ? "hidden" : "block"}`}>
        {children}
      </div>
    )}
  </div>
);

export default Step;
