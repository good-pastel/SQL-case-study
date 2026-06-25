SELECT company_location,
	employment_type,
	experience_level,
	ROUND(AVG(salary_in_usd),2) AS avg_salary,
	ROUND(AVG(salary_in_usd)/12,2) AS sal_avg_monthly
FROM ds_salaries
WHERE job_title LIKE "%data analyst%"
	AND employment_type = "FT"
	AND experience_level IN ("EN","MI")
GROUP BY company_location, employment_type, experience_level
ORDER BY avg_salary DESC;