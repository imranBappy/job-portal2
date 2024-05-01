export const Initial_TABLE_LIMIT = 25;

export const GENDER_LIST = [
    {
        display: 'Male',
        key: 'male',
    },
    {
        display: 'Female',
        key: 'female',
    },
    {
        display: 'Other',
        key: 'other',
    },
];

export const BASE_DIR =
    process.env.NEXT_PUBLIC_BUILD_TYPE === 'DEV'
        ? 'wrightalentstage/'
        : 'wrightalent/';

export const JOB_TYPE_LIST = [
    {
        display: 'Full Time',
        key: 'full_time',
    },
    {
        display: 'Part Time',
        key: 'part_time',
    },
    {
        display: 'Contract',
        key: 'contract',
    },
    {
        display: 'Freelance',
        key: 'freelance',
    },
    {
        display: 'Internship',
        key: 'internship',
    },
    {
        display: 'Temporary',
        key: 'temporary',
    },
    {
        display: 'Volunteer',
        key: 'volunteer',
    },
    {
        display: 'Apprenticeship',
        key: 'apprenticeship',
    },
];
export const EXPERTISE_LEVEL_LIST = [
    {
        display: 'Entry Level',
        key: 'entry',
    },
    {
        display: 'Junior',
        key: 'junior',
    },
    {
        display: 'Mid Level',
        key: 'mid',
    },
    {
        display: 'Senior',
        key: 'senior',
    },
];
export const QUALIFICATION_LIST = [
    {
        display: 'High School',
        key: 'high_school',
    },
    {
        display: 'Associate',
        key: 'associate',
    },
    {
        display: 'Bachelors',
        key: 'bachelors',
    },
    {
        display: 'Masters',
        key: 'masters',
    },
    {
        display: 'PHD',
        key: 'phd',
    },
];
