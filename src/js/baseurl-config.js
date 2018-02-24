import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';

// modify base url here
const browserHistory = useRouterHistory(createHistory)({
    basename: "/"
});

export default browserHistory;