WITH ds_1 AS (
	SELECT work_year,
		ROUND(AVG(salary_in_usd),2) AS avg_salary_ex
	FROM ds_salaries
    WHERE
		employment_type = "FT"
		AND experience_level = "EX"
        AND job_title LIKE "%data analyst"
	GROUP BY work_year
), ds_2 AS (
	SELECT work_year,
		ROUND(AVG(salary_in_usd),2) AS avg_salary_mid
	FROM ds_salaries
    WHERE
		employment_type = "FT"
		AND experience_level = "MI"
        AND job_title LIKE "%data analyst"
	GROUP BY work_year
), t_year AS (
	SELECT DISTINCT work_year
    FROM ds_salaries
)
SELECT t_year.work_year,
	ds_1.avg_salary_ex,
    ds_2.avg_salary_mid,
    ds_1.avg_salary_ex - ds_2.avg_salary_mid AS difference
FROM t_year
LEFT JOIN ds_1
	ON ds_1.work_year = t_year.work_year
LEFT JOIN ds_2
	ON ds_2.work_year = t_year.work_year;