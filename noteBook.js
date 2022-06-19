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

function removeDuplicates(nums) {
    // set a new index 
    // loop through the array, as long the current item is not eaqual to the previous one, the index will ++, finally return the index 
    
    let index = 1
    for(let i = 1;i < nums.length; i++){
        if(nums[i] !== nums[i-1]){
            nums[index] = nums[i]
            index ++
        }
    }
    return index
};

function rotateArray(nums, k){
    k %= nums.length

    let reverse = function(i,j){
        while(i < j){
            let temp = nums[i]
            nums[i] = nums[j]
            nums[j] = temp
            i++
            j--
        }
    }

    reverse(0, nums.length-1)
    reverse(0,k-1)
    reverse(k, nums.length-1)
    return nums
}

var containsDuplicate = function(nums) {
    // hash map 
    // if nums[i] in hash, return true, else hash[nums[i]] = i, i++
    //return false
    
    let hash= {}
    for(let i = 0; i < nums.length; i++){
        if(hash[nums[i]]){
            return true
        }else{
            hash[nums[i]] = true
        }
    }
    return false
};