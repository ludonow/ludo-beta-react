import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';
import introductionIcon from '../../images/active/introduction-icon.png';
import tagIcon from '../../images/active/tag-icon.png';

const categoryIcons = [
    lifestyleIcon,
    readIcon,
    exerciseIcon,
    studyIcon,
    newSkillIcon,
    unmentionablesIcon,
    othersIcon
];

let categories = {};

categories['en'] = [
    'lifestyle',
    'read',
    'exercise',
    'study',
    'new skill',
    'unmentionalbles',
    'others'
];

categories['zh'] = [
    '生活作息',
    '閱讀',
    '運動',
    '教科書',
    '新技能',
    '不可被提起的',
    '其它'
];

export { categories, categoryIcons };