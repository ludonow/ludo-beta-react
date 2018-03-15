import { withEither } from '../../../components/higher-order-components/index';
import EditButton from './EditButton';
import ExpandMoreButton from './ExpandMoreButton';

// rendering condition function
const isMyReport = (props) => props.isMyReport;

const ReportIconButton = withEither(isMyReport, EditButton)(ExpandMoreButton);

export default ReportIconButton;
