function twoSum(nums, target) {
    // setup an object {ele:index.....}
    // use a loop if the target - nums[index] is exisit in the box, return [box[target - nums[i]],i]
    let box = {}
    for( let i = 0; i < nums.length; i++){
        if(target - nums[i] in box){
            return [box[target - nums[i]], i]
        }else{
            box[nums[i]] = i
        }}
    return []
}

