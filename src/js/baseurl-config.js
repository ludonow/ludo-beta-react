import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';

// modify test1 base url here
const browserHistory = useRouterHistory(createHistory)({
    basename: "/"
});

export default browserHistory;