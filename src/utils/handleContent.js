const { default: NotFound } = require("@/components/Common/UI/NotFound");
const { default: Error } = require("@/components/Common/UI/Error");

const { default: CircularLoader } = require("@/components/Loader/CircularLoader");


const handleContent = (data, loading, err) => {

    let content = null;
    if (loading) {
        content = <CircularLoader />
    } else if (err) {
        content = <Error />
    } else if (!data || !data?.length) {
        content = <NotFound />
    } else {
        content = data
    }
    return content;
}

export default handleContent;