import { SWRConfig } from 'swr';
import { NextComponentType, NextPageContext } from 'next';

type Props<P> = P & {
  fallback: Record<string, unknown> | undefined;
};

export default function SWRProvider<P>(
  Component: NextComponentType<NextPageContext, undefined, P>
) {
  return function Children(props: Props<P>) {
    const copyProps = { ...props };
    delete copyProps?.fallback;
    return (
      <SWRConfig value={{ fallback: props?.fallback }}>
        <Component {...copyProps} />
      </SWRConfig>
    );
  };
}
