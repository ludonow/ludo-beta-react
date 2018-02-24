import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';

// modify ludo_test_page base url here
const browserHistory = useRouterHistory(createHistory)({
    basename: "/ludo_test_page"
});

export default browserHistory;