import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';

// modify base url here
const browserHistory = useRouterHistory(createHistory)({
    basename: "/ludo_test_page"
});

export default browserHistory;