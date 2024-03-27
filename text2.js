/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  nums.sort((a, b) => a - b);
  let len = nums.length;
  let res = [];
  let used = new Array(len);
  const dfs = (path) => {
    if (path.length === len) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < len; i++) {
      if (used[i]) continue;
      if (i - 1 >= 0 && nums[i - 1] == nums[i] && !used[i - 1]) {
        continue;
      }

      path.push(nums[i]);
      used[i] = true;
      dfs(path);
      path.pop();
      used[i] = false;
    }
  };
  dfs([]);
  return res;
};
