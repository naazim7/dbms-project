import UserProfile from '@/src/components/User/UserProfile';
import { useRouter } from 'next/router';

const profile = () => {
var router = useRouter();
    var id = router.query.id;
    console.log(id);
    return (
        <>
            
      <UserProfile id={id}></UserProfile>
        
        </>
    )
};

export default profile;