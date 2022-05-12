import { FunctionComponent, PropsWithChildren } from "react";

// as of React 18, FC no longer includes the children props
export type FCC<P = {}> = FunctionComponent<PropsWithChildren<P>>;
