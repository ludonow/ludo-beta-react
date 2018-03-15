import React from 'react';

const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
    conditionalRenderingFn(props)
        ? <EitherComponent { ...props } />
        : <Component { ...props } />

const withMaybe = (conditionalRenderingFn) => (Component) => (props) =>
    conditionalRenderingFn(props)
        ? null
        : <Component { ...props } />

export { withEither, withMaybe };
