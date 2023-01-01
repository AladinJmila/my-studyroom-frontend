export function timeFormatter(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  return { hours, minutes };
}

export function toStringTimeFormatter(duration) {
  const { hours, minutes } = duration;
  let result;
  if (hours) {
    result = `${hours} h ${minutes} m`;
  } else if (minutes) {
    result = `${minutes} m`;
  }

  return result;
}

export function weekPaginate(daysPages) {
  const paginated = [];
  let index = 0;

  for (let i = daysPages.length - 1; i >= 1; i--) {
    const current = daysPages[i];
    const prev = daysPages[i - 1];
    const currentDate = new Date(current.date);
    const prevDate = new Date(prev.date);

    function getWeekNumber(endDate) {
      const startDate = new Date(endDate.getFullYear(), 0, 1);
      const totalDays = Math.floor(endDate - startDate) / (24 * 60 * 60 * 1000);

      return Math.ceil(totalDays / 7);
    }

    if (
      getWeekNumber(currentDate) === getWeekNumber(prevDate) &&
      currentDate.getFullYear() === prevDate.getFullYear()
    ) {
      if (!paginated[index]) {
        paginated[index] = [];
        paginated[index].push(daysPages[i]);
        paginated[index].push(daysPages[i - 1]);
      } else {
        paginated[index].push(daysPages[i - 1]);
      }
      continue;
    } else {
      index++;
    }

    // console.log(paginated);
    // break
    return paginated;
  }
}

export function monthPaginate(daysPages) {
  const paginated = [];
  let index = 0;

  for (let i = daysPages.length - 1; i >= 1; i--) {
    const current = daysPages[i];
    const prev = daysPages[i - 1];
    const currentDate = new Date(current.date);
    const prevDate = new Date(prev.date);

    if (
      currentDate.getMonth() === prevDate.getMonth() &&
      currentDate.getFullYear() === prevDate.getFullYear()
    ) {
      if (!paginated[index]) {
        paginated[index] = [];
        paginated[index].push(daysPages[i]);
        paginated[index].push(daysPages[i - 1]);
      } else {
        paginated[index].push(daysPages[i - 1]);
      }
      continue;
    } else {
      index++;
    }
  }
  // console.log(paginated);
  return paginated.filter(item => item);
}

export function yearPaginate(daysPages, filterData = null) {
  const monthPages = monthPaginate(daysPages);
  // console.log(monthPages);

  const paginated = [];
  let index = 0;

  for (let i = monthPages.length - 1; i >= 1; i--) {
    const current = monthPages[i][0];
    // add some check to prevent crashing
    const prev = monthPages[i - 1][0];

    const currentDate = new Date(current.date);
    const prevDate = new Date(prev.date);

    if (currentDate.getFullYear() === prevDate.getFullYear()) {
      if (!paginated[index]) {
        paginated[index] = [];
        paginated[index].push(monthPages[i]);
        paginated[index].push(monthPages[i - 1]);
      } else {
        paginated[index].push(monthPages[i - 1]);
      }
      continue;
    } else {
      index++;
    }
  }

  let filtered;
  if (filterData) {
    filtered = paginated.map(page => {
      return page.map(month => {
        let totalPerMonth = 0;
        let activities = [];
        month.map(day => {
          return day.activitiesPerSubject.forEach(log => {
            if (
              log.subjectName === filterData.subject.name ||
              log.subjectId === filterData.subject._id
            ) {
              totalPerMonth += log.totalPlayTime;
              log.activities.forEach(activity => {
                filterData.groups.forEach((act, i) => {
                  act.forEach(item => {
                    if (item.name === activity.intervalName) {
                      if (!activities[i])
                        activities[i] = {
                          label: item.label,
                          totalDuration: 0,
                          color: activity.color,
                        };
                      activities[i].totalDuration += activity.totalPlayTime;
                    }
                  });
                });
              });
            }
          });
        });
        return {
          date: month[0].date,
          subject: {
            name: filterData.subject.name,
            _id: filterData.subject._id,
          },
          totalPerMonth,
          activities,
        };
      });
    });
  }

  return filtered.length ? filtered : paginated;
}
