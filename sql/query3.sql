SELECT DISTINCT job_title 
FROM ds_salaries
WHERE job_title LIKE "%data analyst%"
ORDER BY job_title;