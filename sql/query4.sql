SELECT job_title,
	ROUND(AVG (salary_in_usd),2) AS avg_salary,
	ROUND(AVG (salary_in_usd)/12,2) AS sal_avg_monthly
FROM ds_salaries
WHERE job_title LIKE "%data analyst%"
GROUP BY job_title;
