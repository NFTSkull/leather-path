import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  text: string;
  width?: number;
  height?: number;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export function PlaceholderImage({ 
  text, 
  width = 400, 
  height = 300, 
  bgColor = '7A5C3E', 
  textColor = 'FFFFFF',
  className 
}: PlaceholderImageProps) {
  return (
    <div 
      className={cn(
        'flex items-center justify-center text-center p-4 rounded-lg',
        className
      )}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `#${bgColor}`,
        color: `#${textColor}`,
      }}
    >
      <div className="text-lg font-medium">{text}</div>
    </div>
  );
}



