export const wrap: ((Component: any, wrappers: [(component: any) => any]) => any) = (Component, wrappers) => wrappers.reduce((C, wrapper) => wrapper(C), Component);
