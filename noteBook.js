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

function longestSubstringWithKDistinct(str,k){
    let hash = {}
    let start = 0
    let result = 0

    for (let end = 0; end < str.length; end ++){
        let rightChar = str[end]
        if(!(rightChar in hash)){
            hash[rightChar] = 0
        }
        hash[rightChar] += 1

        while(Object.keys(hash).length > k){
            let leftChar = str[start]
            hash[leftChar] -= 1
            if (hash[leftChar]===0){
                delete hash[leftChar]
            }
            start ++
        }
        result = Math.max(result, end - start + 1)
    }
    return result
}


function maxSubArrayOfSizeK(arr, k){
    let start = 0
    let result = []
    let sum =0

    for (let end = 0; end < arr.length; end ++){
        sum += arr[end]
       if (end >= k - 1){
            result.push(sum)
            sum -= arr[start]
            start ++
        }
    }
    return Math.max(...result)
}

function smallestSubarrayWithAGreaterSum(arr, s){
    let start = 0
    let sum = 0
    let result = Infinity

    for (let end = 0; end < arr.length; end ++){
        sum += arr[end]
        while(sum >= s){
            result = Math.min(result, end-start+1)
            sum -= arr[start]
            start ++
        }
    }

    if(result === Infinity){
        return 0
    }
    return result
}

function bestTimeToBuyStock(prices){
    // set two variables: result = 0, min = prices[0]
    // in a for loop, i = 1, compare use Math.min to find the smallest number 
    // also get the biggest result number by using Math.max(prices[i] - min, result)
    let result = 0
    let min = prices[0]
    for(let i = 1; i < prices.length; i++){
        min = Math.min(min, prices[i])
        result = Math.max(result, prices[i] - min)
    }
    return result
}


function bestTimeToBuyII(prices){
    let result = 0
    for (let i = 1; i < prices.length; i++){
        if(prices[i] > prices[i -1]){
            result += prices[i] - prices[i -1]
        }
    }
    return result
}

function productArrayExceptSelt(nums){
    let result = []
    let left = 1
    let right = 1
    for(let i = 0; i < nums.length; i++){
        result[i] = left
        left *= nums[i]
    }
    for(let i = nums.length - 1; i >= 0; i --){
        result[i] *= right
        right *= nums[i]
    }

    return result 
}