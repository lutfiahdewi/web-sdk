import {ReactNode, FC} from 'react';

type WrapperProps = {
  children: ReactNode;  // Defines `children` prop type
  className?: string; 
};

const Wrapper: FC<WrapperProps> = ({ children, className }) => {
  return (
    <div className={'mb-8 '+className}>
      {children}
    </div>
  );
};

export default Wrapper;
