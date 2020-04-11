export function createCourse(course){
  console.log('Action',course);
  return { type:"CREATE_COURSE",course} // course:course Object short hand syntax
}