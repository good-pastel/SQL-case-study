SELECT
    SUM(work_year IS NULL) AS work_year_null,
    SUM(experience_level IS NULL) AS experience_level_null,
    SUM(employment_type IS NULL) AS employment_type_null,
    SUM(job_title IS NULL) AS job_title_null,
    SUM(salary IS NULL) AS salary_null,
    SUM(salary_currency IS NULL) AS salary_currency_null,
    SUM(salary_in_usd IS NULL) AS salary_in_usd_null,
    SUM(employee_residence IS NULL) AS employee_residence_null,
    SUM(remote_ratio IS NULL) AS remote_ratio_null,
    SUM(company_location IS NULL) AS company_location_null,
    SUM(company_size IS NULL) AS company_size_null
FROM ds_salaries;